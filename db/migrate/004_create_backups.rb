class CreateBackups < ActiveRecord::Migration
  def self.up
    create_table :backups do |t|
      t.string :projectName
      t.text :body
      t.string :author
      t.string :author_id
      t.string :author_email
      t.boolean :lock
      t.integer :rev
      t.timestamps
    end
  end

  def self.down
    drop_table :backups
  end
end
