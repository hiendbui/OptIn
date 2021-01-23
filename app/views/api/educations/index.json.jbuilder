@educations.each do |education|
  json.set! education.id do
    json.extract! education, :id, :school
  end
end