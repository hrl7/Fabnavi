require 'rails_helper'

RSpec.describe "timings/show", type: :view do
  before(:each) do
    @timing = assign(:timing, Timing.create!(
      :time => "Time",
      :movie => ""
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Time/)
    expect(rendered).to match(//)
  end
end
