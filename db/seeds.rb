# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Profile.delete_all

User.create([{email: 'demo_user@gmail.com', password: 'password'}])
Profile.create([{user_id: User.first.id, full_name: 'Tabula Rasa', location: 'The Cloud', headline: 'I am you'}])
Profile.last.profile_pic.attach(io: File.open("/Users/hienbui/Documents/optin_images/demo_user.png"), filename: "demo_user.png")