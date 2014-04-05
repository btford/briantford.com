# helpers
RSYNC_EXCLUDES = --exclude 'src' --exclude '.DS_Store' --exclude '.gitignore' --exclude '.hgignore'

# input
JADE_DIR = jade
#JADE_PARTIALS = $(shell find $(JADE_DIR)/templates/partials/*.jade)
JADE_PAGES = $(shell find $(JADE_DIR)/*.jade)

JS_IN_DIR = js
JS_FILES = $(shell find $(JS_IN_DIR)/ -type f -name '*.js')

# output
OUT_DIR = out

STATIC_IN_DIR = static
STATIC_OUT_DIR = $(OUT_DIR)
STATIC_FILES = $(shell find $(STATIC_IN_DIR) -type f)

HTML_OUT_DIR = $(OUT_DIR)
JS_OUT_DIR = $(OUT_DIR)/js

JS_CONCAT_FILES = $(shell find $(JS_IN_DIR)/*.js)

.PHONY: all
all: html css static_files rss

html:
	node compile.js

css: out/css/style.min.css

out/css/style.slim.css: $(shell find $(STATIC_OUT_DIR) -type f -name '*.html') $(shell find $(STATIC_OUT_DIR) -type f -name '*.css')
	./node_modules/.bin/uncss --stylesheets css/style.css out/index.html > out/css/style.slim.css

out/css/style.min.css: out/css/style.slim.css
	./node_modules/.bin/cleancss --s0 < out/css/style.slim.css > out/css/style.min.css

rss:
	node rss.js

static_files: $(STATIC_FILES)
	rsync -vaz $(RSYNC_EXCLUDES) $(STATIC_IN_DIR)/ $(STATIC_OUT_DIR)

#$(HTML_OUT_DIR)/%.html: %.jade
#	jade --path $(JADE_DIR) --out $(HTML_OUT_DIR) $<

$(JS_OUT_DIR)/%.js: $(JS_IN_DIR)/%.js
	@mkdir -p "$(@D)"
	cp $< $@

clean:
	rm -rf $(OUT_DIR)/*
