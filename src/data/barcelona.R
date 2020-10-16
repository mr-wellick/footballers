library(rvest)
library(dplyr)
library(stringr)


# construct base url's for atletico madrid seasons
base_url     = 'https://www.espn.com/soccer/team/squad/_/id/83/league/ESP.1/season/'
season_years = (2004:2020) %>% as.character()
season_urls  = paste(base_url, sep="", season_years)
season_list  = vector(mode = 'list', length = length((season_years)))

# iterate through the years 2003:2020 and create a df for each year
for (index in 1:length(season_urls)) {
  # extract table for specific season
  season_table = read_html(season_urls[index])
 
  # pull in column names
  col_names  = season_table %>% html_nodes(".players .dib")  %>% html_text()
  
  # pull in season table excluding goal keepers
  season_data = season_table %>%  html_nodes(".players .Table__TD")  %>% html_text()
  
  # create df for season table
  season_df = matrix(season_data, ncol = 16, byrow = T) %>% as.data.frame()
  
  # change column names in df
  colnames(season_df) = tolower(col_names)
  season_df['num'] = season_df$name %>% str_match('\\d+')
  season_df$name = season_df$name %>% str_match('\\D+') %>% str_replace_all("[[:punct:]]", "")
  
  # add new data frame to season list
  season_list[[index]] = season_df %>% select(name:age, nat:num)
}

# save all seasons as csv's
for(index in 1:length(season_years)) {
  write.csv(season_list[[index]] %>% na_if('--'), file = paste(season_years[index], sep = '', '.csv') )
}





