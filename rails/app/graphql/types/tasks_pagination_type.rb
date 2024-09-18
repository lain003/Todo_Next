# frozen_string_literal: true

module Types
  class TasksPaginationType < Types::BaseObject
    field :tasks, [Types::TaskType], null: false
    field :pagination, Types::PaginationType, null: false
  end
end
