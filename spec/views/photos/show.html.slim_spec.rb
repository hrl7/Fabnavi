require 'rails_helper'

RSpec.describe "photos/show", type: :view do
  before(:each) do
    @photo = assign(:photo, Photo.create!(
      :file => "File",
      :thumbnail => "Thumbnail",
      :project_id => "Project",
      :order_in_project => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/File/)
    expect(rendered).to match(/Thumbnail/)
    expect(rendered).to match(/Project/)
    expect(rendered).to match(/1/)
  end
end
