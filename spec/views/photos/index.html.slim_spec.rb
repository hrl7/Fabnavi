require 'rails_helper'

RSpec.describe "photos/index", type: :view do
  before(:each) do
    assign(:photos, [
      Photo.create!(
        :file => "File",
        :thumbnail => "Thumbnail",
        :project_id => "Project",
        :order_in_project => 1
      ),
      Photo.create!(
        :file => "File",
        :thumbnail => "Thumbnail",
        :project_id => "Project",
        :order_in_project => 1
      )
    ])
  end

  it "renders a list of photos" do
    render
    assert_select "tr>td", :text => "File".to_s, :count => 2
    assert_select "tr>td", :text => "Thumbnail".to_s, :count => 2
    assert_select "tr>td", :text => "Project".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
