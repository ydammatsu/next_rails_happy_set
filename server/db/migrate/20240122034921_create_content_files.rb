class CreateContentFiles < ActiveRecord::Migration[7.1]
  def change
    create_table :content_files do |t|
      t.string :name
      t.blob :content

      t.timestamps
    end
  end
end
