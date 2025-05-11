module Jekyll
  module ImageCdn
    def image_cdn(url)
      return nil if url.nil?
      @image_cdn = @context.registers[:site].config['image_cdn']
      url.include?('/') ? url : "#{@image_cdn}/#{url}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImageCdn)
