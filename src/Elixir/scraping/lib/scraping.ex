defmodule Scraping do
  def main do
    require Logger

    url = "https://gigazine.net/"
    body = HTTPoison.get!(url).body

    newsList = Floki.find(body, "div.card > h2 > a")
  end
end
