module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        [:categories, :css, :js, :excerpt_text, :excerpt_html, :head_image, :head_image_height, :head_image_shown, :head_image_width, :html, :info, :last_modified_at, :license, :links, :logs, :no_comment, :no_sidenav, :permalink, :references, :slug, :type].each do |field|
          record.delete(field)
        end
        return record
      end
    end
  end
end
