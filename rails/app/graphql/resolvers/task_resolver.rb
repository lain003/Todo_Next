module Resolvers
  class TaskResolver < GraphQL::Schema::Resolver
    type Types::TaskType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      Task.find(id)
    end
  end
end