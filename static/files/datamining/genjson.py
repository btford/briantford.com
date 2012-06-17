###############################################################################
# Data Mining
# Script for creating JSON from compressed tab separated values
# Authors: Brian Ford and Sharon Lee
# 04/09/2011
###############################################################################

import gzip

# Settings
###############################################################################

# Directory containing data
Path = "data/"

# Helper function for format JSON output
def tab_str(num):
    res = ""
    for i in range(0, 4 * num):
        res += " "
    return res


# Classes
###############################################################################

class Rating:
    def __init__(self, user, score):
        self.user = user
        self.score = score


class Song:
    def __init__(self, id):
        self.id = id
        self.ratings = []
    
    def addRating(self, user, score):
        rating = Rating(user, score)
        self.ratings.append(rating)
        return self
    
    def getNumRatings(self):
        return len(self.ratings)
    
    #TODO: memorize this
    def getAvgRating(self):
        if self.getNumRatings() <= 0:
            return 0
        else:
            sum = 0
            for rating in self.ratings:
                sum += rating.score
            return float(sum)/self.getNumRatings()
    


class Album:
    def __init__(self, id):
        self.id = id
        self.songs = {}
    
    def addSong(self, id):
        if id in self.songs:
            song = self.songs[id]
        else:
            song = Song(id)
            song.album = self
        
            self.songs[id] = song
        
        return song
    


class Artist:
    def __init__(self, id):
        self.id = id
        self.albums = {}
    
    def addAlbum(self, id):
        if id in self.albums:
            album = self.albums[id]
        else:
            album = Album(id)
            album.artist = self
        
            self.albums[id] = album
        
        return album
    
    def getNumRatings(self):
        for album_id in self.albums:
            album = self.albums[album_id]
            for song_id in album.songs:
                totalNumRatings += song.getNumRatings()
        return totalNumRatings
    
    def getAvgRating(self):
        numSongs = 0
        totalRatings = 0
        for album_id in self.albums:
            album = self.albums[album_id]
            for song_id in album.songs:
                song = album.songs[song_id]
                numSongs += 1
                totalRatings += song.getAvgRating()
        return float(totalRatings)/numSongs
    


class Genre:
    def __init__(self, line):
        V = line.rstrip().split("\t")
        
        self.id = int(V[0])
        self.parent_id = int(V[1])
        self.level = int(V[2])
        self.name = V[3]
        
        self.children = []
        self.artists = {}
        
        self.numSongs = 0
    
    def __repr__(self):
        return self.name
    
    def addArtist(self, id):
        if id in self.artists:
            artist = self.artists[id]
        else:
            artist = Artist(id)
            artist.genre = self
            
            self.artists[id] = artist

        return artist
    
    def getNumArtists(self):
        return len(self.artists)
    
    def getFamilyNumArtists(self):
        if not hasattr(self, "family_artists"): #memorize
            self.family_artists = self.getNumArtists()
            
            for child in self.children:
                self.family_artists += self.collection.getGenre(child).getFamilyNumArtists()
                
        return self.family_artists
    
    def getAvgRating(self):
        if not hasattr(self, "avg_rating"): # memorize
            if self.getNumArtists() <= 0:
                self.avg_rating = 0
            else:
                rating = 0
                for artist in self.artists:
                    rating += self.artists[artist].getAvgRating()
            
                self.avg_rating = float(rating)/self.getNumArtists()
        
        return self.avg_rating
    
    def getColor(self):
        return "#" + ["ddd","f33","f63","cc3","6f0","360"][int(math.ceil(self.getAvgRating()))]
    
    def printJson(self, tab_level):
        print tab_str(tab_level) + '{'
        print '{tab}"id": "{id}",'.format(tab=tab_str(tab_level+1), id=self.id)
        print '{tab}"name": "{name}",'.format(tab=tab_str(tab_level+1), name=self.name)
        print '{tab}"children": ['.format(tab=tab_str(tab_level+1))

        for child in self.children:
            self.collection.getGenre(child).printJson(tab_level+1)

        print tab_str(tab_level+1) + '],'
        
        print '{tab}"data": '.format(tab=tab_str(tab_level+1)) + '{'
        #print '{tab}"artists": {artists},'.format(tab=tab_str(tab_level+2), artists=self.getNumArtists())
        #print '{tab}"familyArtists": {artists},'.format(tab=tab_str(tab_level+2), artists=self.getFamilyNumArtists())
        #print '{tab}"songs": "{songs}",'.format(tab=tab_str(tab_level+2), artists=self.getNumArtists())
        #print '{tab}"ratings": "{artists}",'.format(tab=tab_str(tab_level+2), ratings=self.getNumArtists())
        print '{tab}"avgRating": {rating},'.format(tab=tab_str(tab_level+2), rating=("%.2f" %self.getAvgRating()))
        print '{tab}"$color": "{color}"'.format(tab=tab_str(tab_level+2), color=self.getColor())
        print tab_str(tab_level+1) + '}'
        print tab_str(tab_level) + '},'
    
    

class GenreCollection:
    def __init__(self):
        self.rootGenres = []
        self.genreDict = {}
        self.songs = {}
        
        self.loadGenreData()
        self.loadSongData()
        self.loadRatingData()
    
    def loadGenreData(self):
        genre_file = gzip.open(Path + "genre-hierarchy.txt.gz")
        for line in genre_file:
            self.addGenre(line)
                
        genre_file.close()
    
    def loadSongData(self):
        song_file = gzip.open(Path + "song-attributes.txt.gz")
        for line in song_file:
            attributes = line.rstrip().split("\t")
            
            song_id = int(attributes[0])
            album_id = int(attributes[1])
            artist_id = int(attributes[2])
            genre_id = int(attributes[3])

            self.songs[song_id] = self.getGenre(genre_id).addArtist(artist_id).addAlbum(album_id).addSong(song_id)
            
        song_file.close()
    
    def loadRatingData(self):
        rating_file = gzip.open(Path + "yahoo.txt.gz")
        for line in rating_file:
            attributes = line.rstrip().split("\t")
            
            user_id = int(attributes[0])
            song_id = int(attributes[1])
            score = int(attributes[2])
            
            self.songs[song_id].addRating(user_id, score)
            
        rating_file.close()
    
    def addGenre(self, line):
        newGenre = Genre(line)
        newGenre.collection = self
        self.genreDict[newGenre.id] = newGenre
        if(newGenre.parent_id != newGenre.id):
            self.getGenre(newGenre.parent_id).children.append(newGenre.id)
        else:
            self.rootGenres.append(newGenre.id)
    
    def getGenre(self, genre_id):
        return self.genreDict[genre_id]
    
    def genreExists(self, genre_id):
        return genre_id in self.genreDict
    
    def printJson(self):
        print 'var json = {'
        print '"id": "m",'
        print '"name": "Music",'
        print '"children": ['

        for node in self.rootGenres:
            self.genreDict[node].printJson(1)

        print ']'
        print '};'
    

# Main function
###############################################################################

def main():
    collection = GenreCollection()
    collection.printJson()

main()

