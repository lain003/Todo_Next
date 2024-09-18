class CreateTasks < ActiveRecord::Migration[7.2]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.integer :status, null: false, default: 0, index: true

      t.timestamps
    end
  end
end
