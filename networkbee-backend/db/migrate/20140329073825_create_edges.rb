class CreateEdges < ActiveRecord::Migration
  def change
    create_table :edges do |t|
      t.string :user_id_1
      t.string :user_id_2

      t.timestamps
    end
  end
end
