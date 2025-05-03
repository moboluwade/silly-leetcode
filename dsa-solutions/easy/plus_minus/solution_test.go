package main

import "testing"

func TestPlusMinus(t *testing.T) {
	if plusMinus() != nil {
		t.Error("Expected nil")
	}
}
