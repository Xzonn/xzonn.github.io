module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        if record[:no_list]
          return nil
        end
        [:categories, :collection, :css, :excerpt_text, :excerpt_html, :head_image, :head_image_height, :head_image_shown, :head_image_width, :html, :i18n, :info, :js, :last_modified_at, :license, :links, :logs, :no_comment, :no_date, :no_list, :no_sidenav, :permalink, :references, :slug, :type].each do |field|
          record.delete(field)
        end
        return record
      end
    end
  end
end
