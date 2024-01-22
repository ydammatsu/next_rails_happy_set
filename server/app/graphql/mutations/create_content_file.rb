# frozen_string_literal: true

module Mutations
  class CreateContentFile < BaseMutation
    field :name, String, null: false

    argument :name, String, required: true
    argument :content, String, required: true
    def resolve(name:, content:)
      puts('👺', name, content)
      content_file = ContentFile.create(name: name, content: content)

      {
        name: name
      }
    end
  end
end
