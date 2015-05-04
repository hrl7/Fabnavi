class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :file
      t.string :thumbnail
      t.string :project_id
      t.integer :order_in_project

      t.timestamps null: false
    end
    add_index :photos , :file
    add_index :photos , :project_id
  end
end
