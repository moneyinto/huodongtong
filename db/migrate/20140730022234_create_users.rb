class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.string :forget_issues
      t.string :forget_answer
      t.string :token

      t.timestamps
    end
  end
end
