class CreatePlaylists < ActiveRecord::Migration
  def self.up
    create_table :playlists do |t|
      t.string :projectName
      t.text :body
      t.string :author
      t.string :authorId
      t.string :author_email
      t.string :thumbnail
      t.timestamps
    end
  end

  def self.down
    drop_table :playlists
  end
end
