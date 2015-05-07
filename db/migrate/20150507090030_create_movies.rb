class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :file
      t.reference :project

      t.timestamps null: false
    end
  end
end
