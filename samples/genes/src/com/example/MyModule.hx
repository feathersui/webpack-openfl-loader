package com.example;

import openfl.text.TextFormat;
import openfl.text.TextField;
import openfl.display.Sprite;

// as long as it is referenced only in a Genes.dynamicImport() call, this class
// will be loaded on-demand, instead of being included in the main bundle
class MyModule extends Sprite {
	public function new() {
		super();
		var tf = new TextField();
		tf.defaultTextFormat = new TextFormat("_sans", 20, 0x333333);
		tf.autoSize = LEFT;
		tf.text = "Hello, I'm a Genes module!";
		addChild(tf);
	}
}
