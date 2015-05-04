class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string  :project_name,          null: false, default: ""
      t.integer :thumbnail_picture_id,  null: false, default: 0
      t.integer :user_id,               null: false
      t.integer :status,                null: false, default: 0
      t.string :description,            null: false, default: ""

      t.timestamps null: false
    end
    add_index :projects, [:project_name, :user_id], unique: true
  end
end
