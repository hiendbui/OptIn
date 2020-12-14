json.extract! @profile, :id, :user_id, :full_name, :headline, :location, :description
json.photoUrl url_for(@profile.profile_pic) if @profile.profile_pic.attached?
json.experiences do
    @profile.experiences.each do |experience|
        json.set! experience.id do
            json.extract! experience :id, :profile_id, :school, :degree, :subject, :start_year, :end_year, :description
        end
    end
end

json.educations do
    @profile.educations.each do |education|
        json.set! education.id do
            json.extract! education :id, :profile_id, :title, :company, :start_date, :end_date, :location, :description
    end
end

json.achievements do
    @profile.achievements.each do |achievement|
        json.set! achievement.id do
            json.extract! achievement :id, :profile_id, :title, :issuer, :year, :description
    end
end
