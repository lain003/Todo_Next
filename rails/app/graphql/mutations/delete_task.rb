# frozen_string_literal: true

module Mutations
  class DeleteTask < BaseMutation
    field :id, ID, null: false

    argument :id, ID, required: true

    def resolve(id:)
      Task.find(id).destroy!
      { id: id }
    end
  end
end
