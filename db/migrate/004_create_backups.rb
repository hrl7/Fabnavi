class CreateBackups < ActiveRecord::Migration
  def self.up
    create_table :backups do |t|
      t.string :projectName
      t.text :body
      t.string :author
      t.string :authorId
      t.string :author_e_mail
      t.string :thumbnail
      t.boolean :lock
      t.integer :rev
      t.timestamps
    end
  end

  def self.down
    drop_table :backups
  end
end
