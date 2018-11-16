defmodule Scraping do
  def main do
    require Logger

    url = "https://gigazine.net/"
    body = HTTPoison.get!(url).body

    newsList = Floki.find(body, "div.card > h2 > a")
                |> Enum.map(&(extractionNews(&1)))
    IO.inspect newsList
  end

  # 必要な情報のみ抽出しMap化
  def extractionNews(n) do
    %{
      "title" => Floki.attribute(n, "title"),
      "link" => Floki.attribute(n, "href")
    }
  end

end
