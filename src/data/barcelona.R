library(rvest)
library(dplyr)
library(stringr)


# construct base url's for barcelona seasons
base_url     = 'https://www.espn.com/soccer/team/squad/_/id/83/league/ESP.1/season/'
season_years = (2004:2020) %>% as.character()
season_urls  = paste(base_url, sep="", season_years)
season_list  = vector(mode = 'list', length = length((season_years)))

# iterate through the years 2004:2020 and create a dataframe for each year
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
  season_df['num'] = season_df$name %>% str_match('\\d+') # extract player number and add new column to existing dataframe
  season_df$name = season_df$name %>% str_match('\\D+') %>% str_replace_all("[[:punct:]]", "") # remove any special punctuation from player names to avoid issues when generating SQL commands
  
  # add new dataframe to season list
  season_list[[index]] = season_df %>% select(name:age, nat:num) # drop unwanted columns before adding dataframe to season list
}

# save all seasons as csv's
for(index in 1:length(season_years)) {
  write.csv(season_list[[index]] %>% na_if('--'), file = paste(season_years[index], sep = '', '.csv'), row.names = F )
}





