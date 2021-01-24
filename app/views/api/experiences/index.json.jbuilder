companies = []
@experiences.each do |experience|
    if !companies.include?(experience.company)
            companies.push(experience.company)
            json.set! experience.id do
            json.extract! experience, :id, :company
            json.photoUrl url_for(experience.photo) if experience.photo.attached?
        end
    end
end