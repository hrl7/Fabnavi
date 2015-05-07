require 'rails_helper'

RSpec.describe "movies/index", type: :view do
  before(:each) do
    assign(:movies, [
      Movie.create!(
        :file => "File",
        :project => ""
      ),
      Movie.create!(
        :file => "File",
        :project => ""
      )
    ])
  end

  it "renders a list of movies" do
    render
    assert_select "tr>td", :text => "File".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
  end
end
