@educations.each do |education|
  json.set! education.id do
    json.extract! education, :id, :school
    json.photoUrl url_for(education.photo) if education.photo.attached?
  end
end