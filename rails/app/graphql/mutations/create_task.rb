# frozen_string_literal: true

module Mutations
  class CreateTask < BaseMutation
    field :task, Types::TaskType, null: false

    argument :name, String, required: true
    argument :description, String, required: false
    argument  :status, Integer, required: true

    def resolve(name:, description:, status:)
      task = Task.create!(name: name, description: description, status: status)
      { task: task }
    rescue ActiveRecord::RecordInvalid => e
      if e.record.errors.details[:name] == [{error: :blank}]
        raise GraphQL::ExecutionError, Settings.error_codes.graphql.mutations.create_task.name_empty
      end
      raise e
    end
  end
end
