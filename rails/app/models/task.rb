class Task < ApplicationRecord
  validates :name, presence: true
  enum status: { not_start: 0, in_progress: 1, complete: 2 }
end
