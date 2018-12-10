class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :username
      t.string :gender
      t.intiger :rating
      t.text :bio

      t.timestamps
    end
  end
end
