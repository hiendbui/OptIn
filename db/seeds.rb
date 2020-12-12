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
Profile.create([{user_id: User.last.id, full_name: 'Demo User', location: 'San Francisco Bay Area', headline: 'Test Engineer at Optin', description: 'I was created in December of 2020. Please feel free to edit me!'}])
Profile.last.profile_pic.attach(io: open("https://optin-dev.s3-us-west-1.amazonaws.com/3vGwZcA6dzTsc3DGGCBkbLgt"), filename: "demo_user.png")
