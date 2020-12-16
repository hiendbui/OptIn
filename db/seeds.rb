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
Profile.create([{user_id: User.last.id, full_name: 'Demo User', location: 'San Francisco Bay Area', headline: 'Test Engineer at Optin', description: 'I was created in December of 2020. Please feel free to edit me! I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!I was created in December of 2020. Please feel free to edit me!'}])
Profile.last.profile_pic.attach(io: open("https://optin-dev.s3-us-west-1.amazonaws.com/3vGwZcA6dzTsc3DGGCBkbLgt"), filename: "demo_user.png")

User.create([{email: 'chefcurry@gmail.com', password: 'curry09'}])
Profile.create([{user_id: User.last.id, full_name: 'Stephen Curry', location: 'San Francisco Bay Area', headline: 'NBA Athlete, Entrepreneur, Investor, Producer', description: 'Believer. Husband to Ayesha, father to Riley, Ryan and Canon, son, brother. Golden State Warriors guard. Davidson Wildcat. Executive Producer. Investor. Entrepreneur. Philippians 4:13.'}])
Profile.last.profile_pic.attach(io: open("https://optin-dev.s3-us-west-1.amazonaws.com/1568784015684.jpg"), filename: "steph_profile_pic.jpg")
Experience.create([{profile_id: Profile.last.id, title: 'Chief Executive Officer', company: 'SC30 Inc.', start_date:'Jan 2018', end_date:'Present', location: 'San Francisco Bay Area'}])
Experience.last.photo.attach(io: open("https://optin-dev.s3-us-west-1.amazonaws.com/1539703187847.png"), filename: "sc30.png")
Experience.create([{profile_id: Profile.last.id, title: 'Guard', company: 'Golden State Warriors', start_date:'July 2009', end_date:'Present', location: 'San Francisco Bay Area', description: '- Selected by Golden State as the 7th pick in the 2009 NBA Draft'}])
Experience.last.photo.attach(io: open("https://optin-dev.s3-us-west-1.amazonaws.com/1589935240758.png"), filename: "gswlogo.png")
Achievement.create([{profile_id: Profile.last.id, title: 'Unanimous MVP', issuer: 'NBA', year: 2016, description: 'Also awarded MVP in 2015'}, {profile_id: Profile.last.id, title: '3x NBA Champion', issuer: 'NBA', description: '2015, 2017, 2018'}])
Education.create([{profile_id: Profile.last.id, school: 'Davidson College', subject: 'Sociology', start_year:'2006', end_year:'2009', description: 'NCAA season scoring leader in 2009'}])
Education.last.photo.attach(io: open("https://optin-dev.s3-us-west-1.amazonaws.com/1595263941861.jpg"), filename: "davidsonlogo.png")


