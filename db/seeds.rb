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
Profile.last.profile_pic.attach(io: open("https://optin-dev.s3-us-west-1.amazonaws.com/3vGwZcA6dzTsc3DGGCBkbLgt"), filename: "demo_user.png")
# file = open("https://rocket--kb-dev.s3-us-west-1.amazonaws.com/#{article.img_name}") article.cover_img.attach(io: file, filename: article.img_name)