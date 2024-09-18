# frozen_string_literal: true

module Mutations
  class UpdateTask < BaseMutation
    field :task, Types::TaskType, null: false

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :description, String, required: false
    argument  :status, Integer, required: true

    def resolve(id:, name:, description:, status:)
      task = Task.find(id)
      task.update!(name: name, description: description, status: status)
      { task: task }
    rescue ActiveRecord::RecordInvalid => e
      if e.record.errors.details[:name] == [{error: :blank}]
        raise GraphQL::ExecutionError, Settings.error_codes.graphql.mutations.create_task.name_empty
      end
      raise e
    end
  end
end
