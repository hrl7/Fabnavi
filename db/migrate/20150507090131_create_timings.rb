class CreateTimings < ActiveRecord::Migration
  def change
    create_table :timings do |t|
      t.string :time
      t.refernce :movie

      t.timestamps null: false
    end
  end
end
