module Jekyll
    class MyCiteTag < Liquid::Tag
      def initialize(tag_name, markup, tokens)
        super
        @keys = markup.strip.split(/\s+/)
      end
  
      def render(context)
        @keys.map do |key|
          "<a href=\"##{key}\" id=\"cite-#{key}\">[#{key}]</a>"
        end.join(', ')
      end
    end
  end
  
  Liquid::Template.register_tag('mycite', Jekyll::MyCiteTag)
  