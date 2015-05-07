require 'rails_helper'

RSpec.describe "movies/show", type: :view do
  before(:each) do
    @movie = assign(:movie, Movie.create!(
      :file => "File",
      :project => ""
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/File/)
    expect(rendered).to match(//)
  end
end
