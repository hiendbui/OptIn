@experiences.each do |experience|
  json.set! experience.id do
    json.extract! experience, :id, :title
    json.photoUrl url_for(experience.photo) if experience.photo.attached?
  end
end