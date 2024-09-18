# frozen_string_literal: true

module Types
  class PaginationType < Types::BaseObject
    field :current, Integer, null: false
    field :totalPages, Integer, null: false
  end
end
