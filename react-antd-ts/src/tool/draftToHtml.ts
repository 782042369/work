/**
   * Utility function to execute callback for eack key->value pair.
   */
function forEach(obj: any, callback: any) {
	if (obj) {
		for (let key in obj) {
			// eslint-disable-line no-restricted-syntax
			if ({}.hasOwnProperty.call(obj, key)) {
				callback(key, obj[key])
			}
		}
	}
}

/**
   * The function returns true if the string passed to it has no content.
   */
function isEmptyString(str: any) {
	if (str === undefined || str === null || str.length === 0 || str.trim().length === 0) {
		return true
	}
	return false
}

/**
   * Mapping block-type to corresponding html tag.
   */
let blockTypesMapping: any = {
	unstyled: 'p',
	'header-one': 'h1',
	'header-two': 'h2',
	'header-three': 'h3',
	'header-four': 'h4',
	'header-five': 'h5',
	'header-six': 'h6',
	'unordered-list-item': 'ul',
	'ordered-list-item': 'ol',
	blockquote: 'blockquote',
	code: 'pre'
}

/**
   * Function will return HTML tag for a block.
   */
function getBlockTag(type: any) {
	return type && blockTypesMapping[type]
}

/**
   * Function will return style string for a block.
   */
function getBlockStyle(data: any) {
	let styles = ''
	forEach(data, function(key: any, value: any) {
		if (value) {
			styles += key + ':' + value + ';'
		}
	})
	return styles
}

/**
   * The function returns an array of hashtag-sections in blocks.
   * These will be areas in block which have hashtags applicable to them.
   */
function getHashtagRanges(blockText: any, hashtagConfig: any) {
	let sections = []
	if (hashtagConfig) {
		let counter = 0
		let startIndex = 0
		let text = blockText
		let trigger = hashtagConfig.trigger || '#'
		let separator = hashtagConfig.separator || ' '
		for (; text.length > 0 && startIndex >= 0; ) {
			if (text[0] === trigger) {
				startIndex = 0
				counter = 0
				text = text.substr(trigger.length)
			} else {
				startIndex = text.indexOf(separator + trigger)
				if (startIndex >= 0) {
					text = text.substr(startIndex + (separator + trigger).length)
					counter += startIndex + separator.length
				}
			}
			if (startIndex >= 0) {
				let endIndex = text.indexOf(separator) >= 0 ? text.indexOf(separator) : text.length
				let hashtag = text.substr(0, endIndex)
				if (hashtag && hashtag.length > 0) {
					sections.push({
						offset: counter,
						length: hashtag.length + trigger.length,
						type: 'HASHTAG'
					})
				}
				counter += trigger.length
			}
		}
	}
	return sections
}

/**
   * The function returns an array of entity-sections in blocks.
   * These will be areas in block which have same entity or no entity applicable to them.
   */
function getSections(block: any, hashtagConfig: any): any {
	let sections = []
	let lastOffset = 0
	let sectionRanges = block.entityRanges.map(function(range: any) {
		let offset = range.offset,
			length = range.length,
			key = range.key

		return {
			offset: offset,
			length: length,
			key: key,
			type: 'ENTITY'
		}
	})
	sectionRanges = sectionRanges.concat(getHashtagRanges(block.text, hashtagConfig))
	sectionRanges = sectionRanges.sort(function(s1: any, s2: any) {
		return s1.offset - s2.offset
	})
	sectionRanges.forEach(function(r: any) {
		if (r.offset > lastOffset) {
			sections.push({
				start: lastOffset,
				end: r.offset
			})
		}
		sections.push({
			start: r.offset,
			end: r.offset + r.length,
			entityKey: r.key,
			type: r.type
		})
		lastOffset = r.offset + r.length
	})
	if (lastOffset < block.text.length) {
		sections.push({
			start: lastOffset,
			end: block.text.length
		})
	}
	return sections
}

/**
   * Function to check if the block is an atomic entity block.
   */
function isAtomicEntityBlock(block: any) {
	if (block.entityRanges.length > 0 && (isEmptyString(block.text) || block.type === 'atomic')) {
		return true
	}
	return false
}

/**
   * The function will return array of inline styles applicable to the block.
   */
function getStyleArrayForBlock(block: any) {
	let text = block.text,
		inlineStyleRanges = block.inlineStyleRanges

	let inlineStyles: any = {
		BOLD: new Array(text.length),
		ITALIC: new Array(text.length),
		UNDERLINE: new Array(text.length),
		STRIKETHROUGH: new Array(text.length),
		CODE: new Array(text.length),
		SUPERSCRIPT: new Array(text.length),
		SUBSCRIPT: new Array(text.length),
		COLOR: new Array(text.length),
		BGCOLOR: new Array(text.length),
		FONTSIZE: new Array(text.length),
		FONTFAMILY: new Array(text.length),
		length: text.length
	}
	if (inlineStyleRanges && inlineStyleRanges.length > 0) {
		inlineStyleRanges.forEach(function(range: any) {
			let offset = range.offset

			let length = offset + range.length
			for (let i = offset; i < length; i += 1) {
				if (range.style.indexOf('color-') === 0) {
					inlineStyles.COLOR[i] = range.style.substring(6)
				} else if (range.style.indexOf('bgcolor-') === 0) {
					inlineStyles.BGCOLOR[i] = range.style.substring(8)
				} else if (range.style.indexOf('fontsize-') === 0) {
					inlineStyles.FONTSIZE[i] = range.style.substring(9)
				} else if (range.style.indexOf('fontfamily-') === 0) {
					inlineStyles.FONTFAMILY[i] = range.style.substring(11)
				} else if (inlineStyles[range.style]) {
					inlineStyles[range.style][i] = true
				}
			}
		})
	}
	return inlineStyles
}

/**
   * The function will return inline style applicable at some offset within a block.
   */
function getStylesAtOffset(inlineStyles: any, offset: any) {
	let styles: any = {}
	if (inlineStyles.COLOR[offset]) {
		styles.COLOR = inlineStyles.COLOR[offset]
	}
	if (inlineStyles.BGCOLOR[offset]) {
		styles.BGCOLOR = inlineStyles.BGCOLOR[offset]
	}
	if (inlineStyles.FONTSIZE[offset]) {
		styles.FONTSIZE = inlineStyles.FONTSIZE[offset]
	}
	if (inlineStyles.FONTFAMILY[offset]) {
		styles.FONTFAMILY = inlineStyles.FONTFAMILY[offset]
	}
	if (inlineStyles.UNDERLINE[offset]) {
		styles.UNDERLINE = true
	}
	if (inlineStyles.ITALIC[offset]) {
		styles.ITALIC = true
	}
	if (inlineStyles.BOLD[offset]) {
		styles.BOLD = true
	}
	if (inlineStyles.STRIKETHROUGH[offset]) {
		styles.STRIKETHROUGH = true
	}
	if (inlineStyles.CODE[offset]) {
		styles.CODE = true
	}
	if (inlineStyles.SUBSCRIPT[offset]) {
		styles.SUBSCRIPT = true
	}
	if (inlineStyles.SUPERSCRIPT[offset]) {
		styles.SUPERSCRIPT = true
	}
	return styles
}

/**
   * Function returns true for a set of styles if the value of these styles at an offset
   * are same as that on the previous offset.
   */
function sameStyleAsPrevious(inlineStyles: any, styles: any, index: any) {
	let sameStyled = true
	if (index > 0 && index < inlineStyles.length) {
		styles.forEach(function(style: any) {
			sameStyled = sameStyled && inlineStyles[style][index] === inlineStyles[style][index - 1]
		})
	} else {
		sameStyled = false
	}
	return sameStyled
}

/**
   * Function returns html for text depending on inline style tags applicable to it.
   */
function addInlineStyleMarkup(style: any, content: any) {
	if (style === 'BOLD') {
		return '<strong>' + content + '</strong>'
	} else if (style === 'ITALIC') {
		return '<em>' + content + '</em>'
	} else if (style === 'UNDERLINE') {
		return '<ins>' + content + '</ins>'
	} else if (style === 'STRIKETHROUGH') {
		return '<del>' + content + '</del>'
	} else if (style === 'CODE') {
		return '<code>' + content + '</code>'
	} else if (style === 'SUPERSCRIPT') {
		return '<sup>' + content + '</sup>'
	} else if (style === 'SUBSCRIPT') {
		return '<sub>' + content + '</sub>'
	}
	return content
}

/**
   * The function returns text for given section of block after doing required character replacements.
   */
function getSectionText(text: any) {
	if (text && text.length > 0) {
		let chars = text.map(function(ch: any) {
			switch (ch) {
				case '\n':
					return '<br>'
				case '&':
					return '&amp;'
				case '<':
					return '&lt;'
				case '>':
					return '&gt;'
				default:
					return ch
			}
		})
		return chars.join('')
	}
	return ''
}

/**
   * Function returns html for text depending on inline style tags applicable to it.
   */
function addStylePropertyMarkup(styles: any, text: any) {
	if (styles && (styles.COLOR || styles.BGCOLOR || styles.FONTSIZE || styles.FONTFAMILY)) {
		let styleString = 'style="'
		if (styles.COLOR) {
			styleString += 'color: ' + styles.COLOR + ';'
		}
		if (styles.BGCOLOR) {
			styleString += 'background-color: ' + styles.BGCOLOR + ';'
		}
		if (styles.FONTSIZE) {
			styleString += 'font-size: ' + styles.FONTSIZE + (/^\d+$/.test(styles.FONTSIZE) ? 'px' : '') + ';'
		}
		if (styles.FONTFAMILY) {
			styleString += 'font-family: ' + styles.FONTFAMILY + ';'
		}
		styleString += '"'
		return '<span ' + styleString + '>' + text + '</span>'
	}
	return text
}

/**
   * Function will return markup for Entity.
   */
function getEntityMarkup(entityMap: any, entityKey: any, text: any, customEntityTransform: any) {
	let entity = entityMap[entityKey]
	if (typeof customEntityTransform === 'function') {
		let html = customEntityTransform(entity, text)
		if (html) {
			return html
		}
	}
	if (entity.type === 'MENTION') {
		return (
			'<a href="' +
			entity.data.url +
			'" class="wysiwyg-mention" data-mention data-value="' +
			entity.data.value +
			'">' +
			text +
			'</a>'
		)
	}
	if (entity.type === 'LINK') {
		let targetOption = entity.data.targetOption || '_self'
		return '<a href="' + entity.data.url + '" target="' + targetOption + '">' + text + '</a>'
	}
	if (entity.type === 'IMAGE') {
		return (
			'<img src="' +
			entity.data.src +
			'" alt="' +
			entity.data.alt +
			'" style="float:' +
			(entity.data.alignment || 'none') +
			';height: ' +
			entity.data.height +
			';width: ' +
			entity.data.width +
			'"/>'
		)
	}
	if (entity.type === 'EMBEDDED_LINK') {
		return (
			'<iframe width="' +
			entity.data.width +
			'" height="' +
			entity.data.height +
			'" src="' +
			entity.data.src +
			'" frameBorder="0"></iframe>'
		)
	}
	return text
}

/**
   * For a given section in a block the function will return a further list of sections,
   * with similar inline styles applicable to them.
   */
function getInlineStyleSections(block: any, styles: any, start: any, end: any) {
	let styleSections: any = []
	let text = block.text

	if (text.length > 0) {
		let inlineStyles = getStyleArrayForBlock(block)
		let section: any = void 0
		for (let i = start; i < end; i += 1) {
			if (i !== start && sameStyleAsPrevious(inlineStyles, styles, i)) {
				section.text.push(text[i])
				section.end = i + 1
			} else {
				section = {
					styles: getStylesAtOffset(inlineStyles, i),
					text: [ text[i] ],
					start: i,
					end: i + 1
				}
				styleSections.push(section)
			}
		}
	}
	return styleSections
}

/**
   * Replace leading blank spaces by &nbsp;
   */
function trimLeadingZeros(sectionText: any) {
	if (sectionText) {
		let replacedText = sectionText
		for (let i = 0; i < replacedText.length; i += 1) {
			if (sectionText[i] === ' ') {
				replacedText = replacedText.replace(' ', '&nbsp;')
			} else {
				break
			}
		}
		return replacedText
	}
	return sectionText
}

/**
   * Replace trailing blank spaces by &nbsp;
   */
function trimTrailingZeros(sectionText: any) {
	if (sectionText) {
		let replacedText = sectionText
		for (let i = replacedText.length - 1; i >= 0; i -= 1) {
			if (replacedText[i] === ' ') {
				replacedText = replacedText.substring(0, i) + '&nbsp;' + replacedText.substring(i + 1)
			} else {
				break
			}
		}
		return replacedText
	}
	return sectionText
}

/**
   * The method returns markup for section to which inline styles
   * like BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE, SUPERSCRIPT, SUBSCRIPT are applicable.
   */
function getStyleTagSectionMarkup(styleSection: any) {
	let styles = styleSection.styles,
		text = styleSection.text

	let content = getSectionText(text)
	forEach(styles, function(style: any) {
		content = addInlineStyleMarkup(style, content)
	})
	return content
}

/**
  * The method returns markup for section to which inline styles
  like color, background-color, font-size are applicable.
  */
function getInlineStyleSectionMarkup(block: any, styleSection: any) {
	let styleTagSections = getInlineStyleSections(
		block,
		[ 'BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE', 'SUPERSCRIPT', 'SUBSCRIPT' ],
		styleSection.start,
		styleSection.end
	)
	let styleSectionText = ''
	styleTagSections.forEach(function(stylePropertySection: any) {
		styleSectionText += getStyleTagSectionMarkup(stylePropertySection)
	})
	styleSectionText = addStylePropertyMarkup(styleSection.styles, styleSectionText)
	return styleSectionText
}

/*
   * The method returns markup for an entity section.
   * An entity section is a continuous section in a block
   * to which same entity or no entity is applicable.
   */
function getSectionMarkup(block: any, entityMap: any, section: any, customEntityTransform: any) {
	let entityInlineMarkup: any = []
	let inlineStyleSections = getInlineStyleSections(
		block,
		[ 'COLOR', 'BGCOLOR', 'FONTSIZE', 'FONTFAMILY' ],
		section.start,
		section.end
	)
	inlineStyleSections.forEach(function(styleSection: any) {
		entityInlineMarkup.push(getInlineStyleSectionMarkup(block, styleSection))
	})
	let sectionText = entityInlineMarkup.join('')
	if (section.type === 'ENTITY') {
		if (section.entityKey !== undefined && section.entityKey !== null) {
			sectionText = getEntityMarkup(entityMap, section.entityKey, sectionText, customEntityTransform) // eslint-disable-line max-len
		}
	} else if (section.type === 'HASHTAG') {
		sectionText = '<a href="' + sectionText + '" class="wysiwyg-hashtag">' + sectionText + '</a>'
	}
	return sectionText
}

/**
   * Function will return the markup for block preserving the inline styles and
   * special characters like newlines or blank spaces.
   */
function getBlockInnerMarkup(block: any, entityMap: any, hashtagConfig: any, customEntityTransform: any) {
	let blockMarkup: any = []
	let sections = getSections(block, hashtagConfig)
	sections.forEach(function(section: any, index: any) {
		let sectionText = getSectionMarkup(block, entityMap, section, customEntityTransform)
		if (index === 0) {
			sectionText = trimLeadingZeros(sectionText)
		}
		if (index === sections.length - 1) {
			sectionText = trimTrailingZeros(sectionText)
		}
		blockMarkup.push(sectionText)
	})
	return blockMarkup.join('')
}

/**
   * Function will return html for the block.
   */
function getBlockMarkup(block: any, entityMap: any, hashtagConfig: any, directional: any, customEntityTransform: any) {
	let blockHtml = []
	if (isAtomicEntityBlock(block)) {
		blockHtml.push(getEntityMarkup(entityMap, block.entityRanges[0].key, undefined, customEntityTransform))
	} else {
		let blockTag = getBlockTag(block.type)
		if (blockTag) {
			blockHtml.push('<' + blockTag)
			let blockStyle = getBlockStyle(block.data)
			if (blockStyle) {
				blockHtml.push(' style="' + blockStyle + '"')
			}
			if (directional) {
				blockHtml.push(' dir = "auto"')
			}
			blockHtml.push('>')
			blockHtml.push(getBlockInnerMarkup(block, entityMap, hashtagConfig, customEntityTransform))
			blockHtml.push('</' + blockTag + '>')
		}
	}
	blockHtml.push('\n')
	return blockHtml.join('')
}

/**
   * Function to check if a block is of type list.
   */
function isList(blockType: any) {
	return blockType === 'unordered-list-item' || blockType === 'ordered-list-item'
}

/**
   * Function will return html markup for a list block.
   */
function getListMarkup(
	listBlocks: any,
	entityMap: any,
	hashtagConfig: any,
	directional?: any,
	customEntityTransform?: any
) {
	let listHtml: any = []
	let nestedListBlock: any = []
	let previousBlock: any = void 0
	listBlocks.forEach(function(block: any) {
		let nestedBlock = false
		if (!previousBlock) {
			listHtml.push('<' + getBlockTag(block.type) + '>\n')
		} else if (previousBlock.type !== block.type) {
			listHtml.push('</' + getBlockTag(previousBlock.type) + '>\n')
			listHtml.push('<' + getBlockTag(block.type) + '>\n')
		} else if (previousBlock.depth === block.depth) {
			if (nestedListBlock && nestedListBlock.length > 0) {
				listHtml.push(
					getListMarkup(nestedListBlock, entityMap, hashtagConfig, directional, customEntityTransform)
				)
				nestedListBlock = []
			}
		} else {
			nestedBlock = true
			nestedListBlock.push(block)
		}
		if (!nestedBlock) {
			listHtml.push('<li')
			let blockStyle = getBlockStyle(block.data)
			if (blockStyle) {
				listHtml.push(' style="' + blockStyle + '"')
			}
			if (directional) {
				listHtml.push(' dir = "auto"')
			}
			listHtml.push('>')
			listHtml.push(getBlockInnerMarkup(block, entityMap, hashtagConfig, customEntityTransform))
			listHtml.push('</li>\n')
			previousBlock = block
		}
	})
	if (nestedListBlock && nestedListBlock.length > 0) {
		listHtml.push(getListMarkup(nestedListBlock, entityMap, hashtagConfig, directional, customEntityTransform))
	}
	listHtml.push('</' + getBlockTag(previousBlock.type) + '>\n')
	return listHtml.join('')
}

/**
   * The function will generate html markup for given draftjs editorContent.
   */
function draftToHtml(editorContent?: any, hashtagConfig?: any, directional?: any, customEntityTransform?: any) {
	let html = []
	if (editorContent) {
		let blocks = editorContent.blocks,
			entityMap = editorContent.entityMap

		if (blocks && blocks.length > 0) {
			let listBlocks: any = []
			blocks.forEach(function(block: any) {
				if (isList(block.type)) {
					listBlocks.push(block)
				} else {
					if (listBlocks.length > 0) {
						let listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, customEntityTransform) // eslint-disable-line max-len
						html.push(listHtml)
						listBlocks = []
					}
					let blockHtml = getBlockMarkup(block, entityMap, hashtagConfig, directional, customEntityTransform)
					html.push(blockHtml)
				}
			})
			if (listBlocks.length > 0) {
				let listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, directional, customEntityTransform) // eslint-disable-line max-len
				html.push(listHtml)
				listBlocks = []
			}
		}
	}
	return html.join('')
}

export default draftToHtml
