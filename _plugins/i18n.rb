=begin

Jekyll  Multiple  Languages  is  an  internationalization  plugin for Jekyll. It
compiles  your  Jekyll site for one or more languages with a similar approach as
Rails does. The different sites will be stored in sub folders with the same name
as the language it contains.

Please visit https://github.com/screeninteraction/jekyll-multiple-languages-plugin
for more details.

=end

module Jekyll
  ##############################################################################
  # class Site
  ##############################################################################
  class Site
    attr_accessor :parsed_translations   # Hash that stores parsed translations read from YAML files.

    alias :process_org :process

    #======================================
    # process
    #
    # Reads Jekyll and plugin configuration parameters set on _config.yml, sets
    # main parameters and processes the website for each language.
    #======================================
    def process
      # Check if plugin settings are set, if not, set a default or quit.
      #-------------------------------------------------------------------------
      self.parsed_translations ||= {}

      # Variables
      #-------------------------------------------------------------------------
      languages                   = self.config['languages'] # List of languages set on _config.yml
      languages.each do |lang|
        self.parsed_translations[lang] = YAML.load_file("#{self.config['source']}/_i18n/#{lang}.yml")  
      end

      self.config['default_lang'] = languages.first          # Default language (first language of array set on _config.yml)
      self.config[        'lang'] = languages.first          # Current language being processed
      self.config['translations'] = self.parsed_translations # Hash that stores parsed translations read from YAML files. Exposes this hash to Liquid.

      # Build the website
      #-------------------------------------------------------------------------
      process_org
    end
  end

  class LocalizeTag < Liquid::Tag
    def initialize(tag_name, key, tokens)
      super
      @key = key.strip
    end

    def render(context)
      site = context.registers[:site] # Jekyll site object
      if site.parsed_translations.nil?
        return
      end
      lang = context.registers[:page]['lang']
      translation_dict = site.parsed_translations[lang]

      if      "#{context[@key]}" != "" # Check for page variable
        key = "#{context[@key]}"
      else
        key =            @key
      end
      key = Liquid::Template.parse(key).render(context)  # Parses and renders some Liquid syntax on arguments (allows expansions)
      
      if translation_dict.nil?
        puts "Missing language: #{lang}"
        lang = site.config['default_lang']
        translation_dict = site.parsed_translations[lang]
      end

      translation = translation_dict.access(key) if key.is_a?(String)
      
      if translation.nil? or translation.empty?
         translation = site.parsed_translations[site.config['default_lang']].access(key)
        
        if site.config["verbose"]
          puts "Missing i18n key: #{lang}:#{key}"
          puts "Using translation '%s' from default language: %s" %[translation, site.config['default_lang']]
        end
      end

      TranslatedString.translate(key, lang, site)
      
      translation
    end
  end
end

unless Hash.method_defined? :access
  class Hash
  
    #======================================
    # access
    #======================================
    def access(path)
      ret = self
      
      path.split('.').each do |p|
      
        if p.to_i.to_s == p
          ret = ret[p.to_i]
        else
          ret = ret[p.to_s] || ret[p.to_sym]
        end
        
        break unless ret
      end
      
      ret
    end
  end
end

def translate_key(key, lang, site)
  translation = site.parsed_translations[lang].access(key) if key.is_a?(String)

  if translation.nil? or translation.empty?
    translation = site.parsed_translations[site.config['default_lang']].access(key)

    puts "Missing i18n key: #{lang}:#{key}"
    puts "Using translation '%s' from default language: %s" %[translation, site.config['default_lang']]
  end

  translation
end

class TranslatedString < String
  #======================================
  # initialize
  #======================================
  def initialize(*several_variants, key)
    super(*several_variants)
    @key = key
  end

  def key
    @key
  end

  #======================================
  # translate
  #======================================
  def self.translate(str, lang, site)
    if str.is_a?(TranslatedString)
      key = str.key
    else
      key = str
    end
    return TranslatedString.new(translate_key(key, lang, site), key = key)
  end
end

Liquid::Template.register_tag('t',              Jekyll::LocalizeTag          )
Liquid::Template.register_tag('translate',      Jekyll::LocalizeTag          )