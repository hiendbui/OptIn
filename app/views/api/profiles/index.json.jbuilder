@profiles.each do |profile|
  json.set! profile.id do
    json.extract! profile, :id, :full_name, :headline, :location, :description
  end
end