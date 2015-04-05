package com.qreal.robots.model.robot;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.qreal.robots.parser.ModelConfig;
import com.qreal.robots.parser.ModelConfigParser;
import com.qreal.robots.parser.SystemConfig;
import com.qreal.robots.parser.SystemConfigParser;

/**
 * Created by ageevdenis on 02-3-15.
 */
public class RobotInfo {

    private String owner;
    private String secretCode;
    private String modelConfig;
    private String systemConfig;
    private String program;

    public RobotInfo() {

    }


    public RobotInfo(String owner, String secretCode) {
        this.owner = owner;
        this.secretCode = secretCode;
        this.modelConfig = "";
    }

    public String getSecretCode() {
        return secretCode;
    }

    public void setSecretCode(String secretCode) {
        this.secretCode = secretCode;
    }

    public String getModelConfig() {
        return modelConfig;
    }

    public void setModelConfig(String modelConfig) {
        this.modelConfig = modelConfig;
    }

    public String getSystemConfig() {
        return systemConfig;
    }

    public void setSystemConfig(String systemConfig) {
        this.systemConfig = systemConfig;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    @JsonIgnore
    public SystemConfig getSystemConfigObject() {
        return new SystemConfigParser().parse(systemConfig);
    }

    @JsonIgnore
    public ModelConfig getModelConfigObject() {
        return new ModelConfigParser().parse(modelConfig);
    }
}
