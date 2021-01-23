@experiences.each do |experience|
  json.set! experience.id do
    json.extract! experience, :id, :title
  end
end