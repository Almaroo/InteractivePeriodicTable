<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/elements">
  <xsl:element name="elements">
  <xsl:for-each select="element">
  <xsl:element name="element">
  <xsl:attribute name="family">
  <xsl:value-of select="family"/>
  </xsl:attribute>
  <xsl:copy-of select="number"/>
  <xsl:copy-of select="symbol"/>
  <xsl:copy-of select="name"/>
  <xsl:copy-of select="mass"/>
  </xsl:element>
  </xsl:for-each>
  </xsl:element>
  </xsl:template>
</xsl:stylesheet>
