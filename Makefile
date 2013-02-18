# helpers
RSYNC_EXCLUDES = --exclude 'src' --exclude '.DS_Store' --exclude '.gitignore' --exclude '.hgignore'

# input
JADE_DIR = jade
#JADE_PARTIALS = $(shell find $(JADE_DIR)/templates/partials/*.jade)
JADE_PAGES = $(shell find $(JADE_DIR)/*.jade)

SASS_DIR = sass
SASS_FILES = $(shell find $(SASS_DIR)/*.scss)

JS_IN_DIR = js
IMG_IN_DIR = img

IMG_FILES = $(shell find $(IMG_IN_DIR)/ -type f -name '*.png')
JS_FILES = $(shell find $(JS_IN_DIR)/ -type f -name '*.js')

MISC_IN_DIR = misc

# output
OUT_DIR = out

HTML_OUT_DIR = $(OUT_DIR)
CSS_OUT_DIR = $(OUT_DIR)/css
IMG_OUT_DIR = $(OUT_DIR)/img
JS_OUT_DIR = $(OUT_DIR)/js
STATIC_IN_DIR = static
STATIC_OUT_DIR = $(OUT_DIR)

JS_CONCAT_FILES = $(shell find $(JS_IN_DIR)/*.js)

.PHONY: all
all: html css images rss

html:
	node compile.js

rss:
	node rss.js

misc:
	rsync -vaz $(RSYNC_EXCLUDES) $(STATIC_IN_DIR)/ $(STATIC_OUT_DIR)

css: $(CSS_OUT_DIR)/style.css

images:
	rsync -vaz $(RSYNC_EXCLUDES) img/ $(STATIC_OUT_DIR)/img

#$(HTML_OUT_DIR)/%.html: %.jade
#	jade --path $(JADE_DIR) --out $(HTML_OUT_DIR) $<

$(JS_OUT_DIR)/%.js: $(JS_IN_DIR)/%.js
	@mkdir -p "$(@D)"
	cp $< $@

$(CSS_OUT_DIR)/style.css: $(SASS_FILES)
	compass compile --output-style compressed

clean:
	rm -rf $(OUT_DIR)/*
