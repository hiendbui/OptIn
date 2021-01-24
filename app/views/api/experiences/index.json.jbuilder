companies = []
id = 1
@experiences.shuffle.each do |experience|
    if !companies.include?(experience.company)
            json.set! id do
            json.extract! experience, :id, :company
            json.photoUrl url_for(experience.photo) if experience.photo.attached?
        end
    end
    companies.push(experience.company)
    id += 1
end