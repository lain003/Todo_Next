module Resolvers
  class TasksPaginationResolver < GraphQL::Schema::Resolver
    type Types::TasksPaginationType, null: false

    argument :page, Integer, required: true

    def resolve(page:)
      tasks = Task.order(:id).page(page).per(5)
      {
        tasks: tasks,
        pagination:{
          current: tasks.current_page,
          totalPages: tasks.total_pages
        }
      }
    end
  end
end